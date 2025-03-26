import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51R6WNcQo45tGk69HpCOb8dgoPoKltZM9kJkduC2jgsaDH0hzaNlIBXyNO5fUkRuSH6VYDEktkcAIK83MeGW4VIQL00ouw0MjLy',
  {
    apiVersion: '2025-02-24.acacia',
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
}
