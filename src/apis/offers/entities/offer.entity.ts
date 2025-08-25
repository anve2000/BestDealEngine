// src/entity/Offer.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Bank } from "./bank.entity";

@Entity({ name: "Offer" })
export class Offer {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "offer_id", type: "varchar", nullable: false, unique: true })
  offerId: string;

  @ManyToOne(() => Bank, { eager: true }) 
  @JoinColumn({ name: "bank_id" }) 
  bank: Bank;

  @Column({ name: "discount_type", type: "varchar", length: 50, nullable: false })
  discountType: "percentage" | "fixed";

  @Column({ name: "discount_percent", type: "decimal", precision: 5, scale: 2, nullable: true })
  discountPercent: number | null;

  @Column({ name: "fixed_discount", type: "decimal", precision: 10, scale: 2, nullable: true })
  fixedDiscount: number | null;

  @Column({ name: "max_discount", type: "decimal", precision: 10, scale: 2, nullable: true })
  maxDiscount: number | null;

  @Column({ name: "min_transaction_amount", type: "decimal", precision: 12, scale: 2, nullable: false })
  minTransactionAmount: number;

  @Column({ name: "payment_instrument", type: "varchar", length: 50, nullable: false })
  paymentInstrument: "CREDIT_CARD" | "DEBIT_CARD" | "EMI" | "UPI";

  @Column({ name: "offer_title", type: "text", nullable: false })
  offerTitle: string;

  @Column({ name: "valid_till", type: "timestamp", nullable: true })
  expirationDate: Date | null;

  @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}