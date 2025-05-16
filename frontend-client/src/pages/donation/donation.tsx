import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./DonationPage.sass";
import { DonationForm } from "../../components/donation/DonationForm";
import TransactionsList from "../../components/donation/Transactions";

// Инициализация Stripe с тестовым ключом
const stripePromise = loadStripe(
  "pk_test_51R6WNcQo45tGk69HUNEnGyzLp6As3HFgEHL2CSvMYOtqnZO6ubhDStX6Fy7zLoOm6Yk1Glg86m6FNvbOfgW3zrRA0065WSxxgj"
);

export const DonationPage: React.FC = () => {
  return (
    <div className="donation-page-container container">
      <Elements stripe={stripePromise}>
        <DonationForm />
        <TransactionsList />
      </Elements>
    </div>
  );
};
