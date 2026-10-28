'use client';

import { ArrowRight, Check, CreditCard, HandHeart, ShieldCheck, X, CircleX } from 'lucide-react';

interface PaymentMethodChoiceProps {
  amount: number;
  onCard: () => void;
  onCrypto: () => void;
  onClose: () => void;
  cardUnavailable?: boolean;
}

export function PaymentMethodChoice({ amount, onCard, onCrypto, onClose, cardUnavailable = false }: PaymentMethodChoiceProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/65 p-4 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-labelledby="payment-choice-title">
      <div className="relative my-auto max-h-[calc(100vh-2rem)] w-full max-w-4xl overflow-y-auto rounded-3xl bg-background shadow-2xl ring-1 ring-foreground/10 sm:max-h-[calc(100vh-3rem)]">
        <div className="border-b border-border bg-card px-6 py-8 text-card-foreground sm:px-10 sm:py-9">
          <button type="button" onClick={onClose} aria-label="Close payment method selection" className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full border border-zinc-200 bg-white/80 p-2 text-muted-foreground transition hover:bg-zinc-50 hover:text-foreground">
            <X aria-hidden="true" />
          </button>
          <div className="mb-7 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-slate-950 text-primary-foreground shadow-sm"><HandHeart aria-hidden="true" /></span>
            <span className="text-sm font-bold uppercase tracking-[0.14em] text-primary">Your gift, your choice</span>
          </div>
          <h2 id="payment-choice-title" className="max-w-2xl text-balance font-sans text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.02em] text-foreground sm:text-[2.15rem]">Support our project with a secure payment</h2>
          {cardUnavailable ? (
            <div className="mt-5 flex max-w-xl items-start gap-3 rounded-2xl border border-destructive/25 bg-destructive/5 px-4 py-4 text-destructive shadow-sm" role="alert">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-destructive/15">
                <CircleX className="size-7" aria-hidden="true" />
              </span>
              <div className="pt-0.5">
                <p className="font-sans text-[1.25rem] font-semibold leading-tight tracking-[-0.015em] text-red-700 sm:text-[1.35rem]">Transaction was not successful</p>
                <p className="mt-1 text-sm leading-6 text-destructive"><span className="text-foreground">We&apos;re sorry, but the transaction was</span> <strong>not successful.</strong></p>
                <p className="mt-1 text-sm leading-6 text-destructive"><strong>Declined: Restricted card.</strong><br /><span className="text-foreground">Please check your information. If the problem persists, please contact customer services.</span></p>
              </div>
            </div>
          ) : (
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Choose how you would like to complete your donation.</p>
          )}
        </div>

        <div className="grid gap-5 bg-muted/20 p-5 sm:grid-cols-2 sm:p-8">
          <button type="button" onClick={onCard} className="group flex min-h-[28rem] flex-col justify-between rounded-3xl border border-primary/25 bg-primary/[0.035] p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary shadow-sm"><CreditCard aria-hidden="true" /></span>
              <span className="rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary-foreground">Popular</span>
            </div>
            <span>
              <strong className="mt-5 block text-[1.35rem] font-bold tracking-tight text-card-foreground">Donate with Card</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">Pay securely with your debit or credit card.</span>
              <>
                  <span className="mt-3 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">We accept</span>
                  <span className="mt-2 flex h-8 w-full items-center justify-between gap-1" aria-label="Accepted cards">
                    {[
                      ['Visa', '/logos/visa.svg'],
                      ['Mastercard', '/logos/mastercard.svg'],
                      ['American Express', '/logos/amex.svg'],
                      ['Discover', '/logos/discover.svg'],
                      ['JCB', '/logos/jcb.svg'],
                    ].map(([name, src]) => (
                      <span key={name} className="flex h-8 w-[19%] items-center justify-center rounded-md border border-border bg-background px-1">
                        <img src={src} alt={`${name} logo`} className="block h-6 w-full object-contain" />
                      </span>
                    ))}
                  </span>
                  <span className="mt-4 flex flex-col gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
                    {['Fast and secure checkout', 'Visa, Mastercard & more', 'Your payment is protected'].map((item) => (
                      <span key={item} className="flex items-center gap-2.5"><span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-primary text-primary"><Check className="size-3" aria-hidden="true" /></span>{item}</span>
                    ))}
                  </span>
                  <span className="mt-5 flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-5 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-sm transition group-hover:bg-primary/90">Continue with card <ArrowRight className="size-5" aria-hidden="true" /></span>
                </>
              </span>
          </button>

          <button type="button" onClick={onCrypto} className="group flex min-h-[28rem] flex-col justify-between rounded-3xl border border-zinc-200 bg-zinc-50/40 p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#7E57C2]/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-7">
            <span>
              <span className="flex items-start justify-between gap-4">
                <span className="flex size-14 items-center justify-center rounded-full bg-slate-950 p-2.5 shadow-sm">
                  <img src="/logos/solana.png" alt="Solana logo" width="64" height="64" className="block size-full object-contain" />
                </span>
                <span className="rounded-full bg-[#F3F0FF] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#7E57C2]">No card required</span>
              </span>
              <strong className="mt-5 block text-[1.35rem] font-bold tracking-tight text-card-foreground">Donate with Crypto</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">Connect your Solana wallet<br />and send your gift directly.</span>
            </span>
            <span className="mt-5 flex flex-col">
              <span className="flex flex-col gap-1.5 border-t border-border pt-3 text-sm text-muted-foreground">
                {['Secure wallet connection', 'Low fees on Solana network', 'You stay in control'].map((item) => (
                  <span key={item} className="flex items-center gap-2.5"><span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-[#7E57C2] text-[#7E57C2]"><Check className="size-3" aria-hidden="true" /></span>{item}</span>
                ))}
              </span>
              <span className="mt-5 flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#7E57C2] bg-white px-5 text-sm font-bold uppercase tracking-wide text-[#7E57C2] shadow-sm transition hover:bg-[#7E57C2]/5">Connect wallet <ArrowRight className="size-5" aria-hidden="true" /></span>
            </span>
          </button>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-1 border-t border-zinc-100 px-6 py-5 text-center font-sans text-zinc-500 sm:px-8">
          <p className="flex items-center gap-1.5 text-sm font-medium leading-tight"><ShieldCheck className="size-4 shrink-0" aria-hidden="true" />Your payment information is handled securely.</p>
          <p className="text-xs font-normal leading-5">You can change your payment method before completing your donation.</p>
        </div>
      </div>
    </div>
  );
}