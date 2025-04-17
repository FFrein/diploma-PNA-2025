import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

export const DonationForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch(
        "http://localhost:3000/transactions/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amount * 100 }), // Сумма в копейках (RUB)
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка создания PaymentIntent");
      }

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement!,
        },
      });

      if (result.error) {
        setError(result.error.message || "Ошибка при обработке оплаты");
      } else {
        setSuccess("Платёж отправлен! Спасибо за ваше пожертвование.");
      }
    } catch (err: any) {
      setError(`Ошибка: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="donation-form">
      <h2>Сделать пожертвование</h2>
      <div className="donation-form-form">
        <div className="form-group">
          <label>Сумма (в рублях):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="1"
            className="form-input"
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Данные карты:</label>
          <CardElement
            className="card-element"
            options={{ disabled: isLoading }}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button
          type="submit"
          disabled={!stripe || isLoading}
          className="submit-button"
        >
          {isLoading ? "Обработка..." : "Пожертвовать (тест)"}
        </button>
      </div>
    </form>
  );
};
