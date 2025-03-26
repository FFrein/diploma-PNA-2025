import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./DonationPage.css";

// Инициализация Stripe с тестовым ключом
const stripePromise = loadStripe(
  "pk_test_51R6WNcQo45tGk69HUNEnGyzLp6As3HFgEHL2CSvMYOtqnZO6ubhDStX6Fy7zLoOm6Yk1Glg86m6FNvbOfgW3zrRA0065WSxxgj"
);
//4242 4242 4242 4242
//4000 0000 0000 0002
//https://stripe.com/docs/testing
const DonationForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      // Создаём PaymentIntent на сервере
      const response = await fetch(
        "http://localhost:3000/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amount * 100 }), // Сумма в центах
        }
      );

      const { clientSecret } = await response.json();

      // Подтверждаем оплату на клиенте
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement!,
        },
      });

      if (result.error) {
        setError(result.error.message || "Ошибка при обработке оплаты");
      } else if (result.paymentIntent?.status === "succeeded") {
        setSuccess("Спасибо за ваше пожертвование!");
      }
    } catch (err: any) {
      setError("Ошибка: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="donation-form">
      <h2>Сделать пожертвование</h2>
      <div className="form-group">
        <label>Сумма (в рублях):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="1"
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label>Данные карты:</label>
        <CardElement className="card-element" />
      </div>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <button type="submit" disabled={!stripe} className="submit-button">
        Пожертвовать (тест)
      </button>
    </form>
  );
};

export const DonationPage: React.FC = () => {
  return (
    <div className="donation-page-container">
      <Elements stripe={stripePromise}>
        <DonationForm />
      </Elements>
    </div>
  );
};
