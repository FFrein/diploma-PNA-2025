import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import Stripe from 'stripe';
import * as bodyParser from 'body-parser';

const stripe = new Stripe(
  'sk_test_51R6WNcQo45tGk69HpCOb8dgoPoKltZM9kJkduC2jgsaDH0hzaNlIBXyNO5fUkRuSH6VYDEktkcAIK83MeGW4VIQL00ouw0MjLy',
  {
    apiVersion: '2025-02-24.acacia',
    typescript: true,
  },
);

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: { amount: number }) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount,
      currency: 'rub',
      payment_method_types: ['card'],
    });

    return { clientSecret: paymentIntent.client_secret };
  }

  @Post('stripe-webhook')
  async handleWebhook(@Req() request: Request) {
    const sig = request.headers['stripe-signature'] as string;
    // Ensure raw body is available (you might need middleware for this)
    const rawBody = (request as any).rawBody; // Temporary workaround

    if (!rawBody) {
      throw new HttpException(
        'Missing raw body in request',
        HttpStatus.BAD_REQUEST,
      );
    }

    const webhookSecret =
      'whsec_ec8a19d048d071f290d31fbbbf9f0c63a5ae7529c424543439d3e866848c2016';

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      throw new HttpException(
        'Webhook signature verification failed',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('PaymentIntent was successful:', paymentIntent);
        // Handle successful payment intent
        break;
      case 'payment_intent.payment_failed':
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('PaymentIntent failed:', failedPaymentIntent);
        // Handle failed payment intent
        break;
      case 'charge.succeeded':
        const charge = event.data.object as Stripe.Charge;
        console.log('Charge succeeded:', charge);
        // Handle successful charge
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return { received: true };
  }
}
