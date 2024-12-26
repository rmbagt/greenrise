<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Services\MidtransService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DonationController extends Controller
{
    protected $midtransService;

    public function __construct(MidtransService $midtransService)
    {
        $this->midtransService = $midtransService;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'amount' => ['required', 'numeric'],
            'event_id' => ['required', 'exists:events,id'],
            'date' => ['required', 'date'],
        ]);

        $data['date'] = Carbon::parse($data['date'])->format('Y-m-d');
        $data['user_id'] = auth()->id();
        
        $donation = Donation::create($data);

        $customerDetails = [
            'first_name' => auth()->user()->name,
            'email' => auth()->user()->email,
        ];

        $midtransResponse = $this->midtransService->createTransaction($donation->id, $data['amount'], $customerDetails);

        if ($midtransResponse['success']) {
            return response()->json([
                'success' => true,
                'snap_token' => $midtransResponse['snap_token'],
                'donation_id' => $donation->id,
            ]);
        } else {
            $donation->delete();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create payment: ' . $midtransResponse['message'],
            ], 500);
        }
    }

    public function handleCallback(Request $request)
    {
        $orderId = $request->input('order_id');
        $transactionStatus = $request->input('transaction_status');
        $fraudStatus = $request->input('fraud_status');

        $donation = Donation::findOrFail($orderId);

        if ($transactionStatus == 'capture' || $transactionStatus == 'settlement') {
            if ($fraudStatus == 'accept') {
                $donation->status = 'paid';
                $donation->save();
                return redirect()->route('event.show', $donation->event_id)->with('success', 'Donation created successfully.');
            }
        } elseif ($transactionStatus == 'cancel' || $transactionStatus == 'deny' || $transactionStatus == 'expire') {
            $donation->status = 'failed';
            $donation->save();
            return redirect()->route('event.show', $donation->event_id)->with('error', 'Donation payment failed.');
        } elseif ($transactionStatus == 'pending') {
            $donation->status = 'pending';
            $donation->save();
            return redirect()->route('event.show', $donation->event_id)->with('info', 'Donation payment is pending.');
        }

        return redirect()->route('event.index')->with('error', 'Invalid donation.');
    }
}