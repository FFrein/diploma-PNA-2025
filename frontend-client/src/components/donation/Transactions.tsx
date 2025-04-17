import React, { useState, useEffect } from "react";
import { TransactionsService } from "../../api/services/all.services.ts";
import Paginator from "../paginator.tsx";
import "./Transaction.sass";

export const TransactionsList: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await TransactionsService.search(page, pageSize);
      setTransactions(response.data.transactions || response.data);
      setTotalTransactions(response.data.total || response.data.length);
      setError(null);
    } catch (err: any) {
      setError("Ошибка при загрузке транзакций: " + err.message);
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="transactions-container container">
      <h2>История пожертвований</h2>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <div className="transactions-error">{error}</div>
      ) : transactions.length > 0 ? (
        <>
          <ul className="transactions-list">
            {transactions.map((txn) => (
              <li key={txn.id} className="transaction-item">
                <div className="transaction-amount">Сумма: {txn.amount} ₽</div>
                <div className="transaction-date">Дата: {txn.date}</div>
              </li>
            ))}
          </ul>
          <Paginator
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalAnimals={totalTransactions}
            pageSize={pageSize}
          />
        </>
      ) : (
        <p>Транзакций пока нет.</p>
      )}
    </div>
  );
};

export default TransactionsList;
