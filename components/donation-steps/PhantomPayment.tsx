'use client';

import { useState } from 'react';
import { ArrowLeft, Check, Copy, Loader2, ShieldCheck, Wallet, X, ZoomIn } from 'lucide-react';

interface PhantomProvider {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
}

declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

interface PhantomPaymentProps {
  amount: number;
  onBack: () => void;
  onClose: () => void;
}

const DONATION_DEPOSIT_ADDRESS = 'BymFYEWeKSSxbqFXjMHgE1XVB5PRdhc6dUJwW6gDQzXf';
const phantomGuide = [
  {
    step: 'Step 1',
    stepNumber: 1,
    title: 'Download and create your wallet',
    description: <>Install Phantom from the <a href="https://phantom.app/download" target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-2 hover:text-primary/80">official download page</a> or your device app store. Choose Continue with Email, use your Google or Apple account, then create a PIN. Never share your recovery phrase.</>,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/step1-Ub1XvCpcN99p4Vt65l2RVvaXwHC6eK.webp',
    alt: 'Phantom wallet setup screens showing email sign-in and PIN creation',
  },
  {
    step: 'Step 2',
    stepNumber: 2,
    title: 'Fund your wallet',
    description: 'Click Buy on your wallet homepage. Select Solana as the cryptocurrency to purchase. Enter the amount and choose a payment method. Select your transaction provider. Click Continue and complete the purchase.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/step2a-uJelosRbJL0mF0sMCBGEAeQiwTqdYy.webp',
    alt: 'Phantom wallet screens showing Solana selection and payment methods',
  },
  {
    step: 'Step 3',
    stepNumber: 3,
    title: 'Send Solana to the donation address',
    description: 'Once your purchase is complete, your Solana (SOL) balance will appear on your wallet homepage. Click Send, select Solana, then copy the donation address provided below or scan the QR code provided below. Enter the donation amount, review the recipient details, and click Send.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/step3-G8Cus8Oo7D1Fne5bqdVBYqxDfQbiOO.webp',
    alt: 'Phantom wallet screens showing Solana selection and the send screen',
  },
  {
    step: 'Step 4',
    stepNumber: 4,
    title: 'Review the transaction preview',
    description: 'Before confirming, check the exact amount, destination, network fee, and any risk warnings. Only confirm when every detail matches this donation.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/step4-ppaesjhIR0pw3dGOyn4P1lB9orndBB.webp',
    alt: 'Phantom transaction preview showing amount, destination, network fee, and confirmation',
  },
];

export function PhantomPayment({ amount, onBack, onClose }: PhantomPaymentProps) {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null);

  const connectWallet = async () => {
    setMessage('');
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      const currentPage = encodeURIComponent(window.location.href);
      window.location.href = `https://phantom.app/ul/v1/browse/${currentPage}?ref=${encodeURIComponent(window.location.origin)}`;
      return;
    }

    if (!window.solana?.isPhantom) {
      window.open('https://phantom.app/download', '_blank', 'noopener,noreferrer');
      setMessage('Phantom is not installed. Install the browser extension, then return here to connect.');
      return;
    }
    try {
      setIsConnecting(true);
      const response = await window.solana.connect();
      setWalletAddress(response.publicKey.toString());
      setMessage('Wallet connected. Review the donation details before confirming in Phantom.');
    } catch {
      setMessage('Wallet connection was cancelled or could not be completed.');
    } finally {
      setIsConnecting(false);
    }
  };

  const copyAddress = async () => {
    await navigator.clipboard.writeText(DONATION_DEPOSIT_ADDRESS);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-background">
      <div className="bg-primary px-6 py-7 text-primary-foreground sm:px-9">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-2xl bg-primary-foreground/10"><Wallet aria-hidden="true" /></span><div><h2 className="text-2xl font-semibold">Donate with crypto</h2><p className="mt-1 text-sm text-primary-foreground/70">Phantom wallet on Solana</p></div></div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-primary-foreground/70 transition hover:bg-primary-foreground/10 hover:text-primary-foreground" aria-label="Back to payment methods"><X aria-hidden="true" /></button>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-6 sm:p-9">
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-5"><div><p className="text-sm font-medium text-muted-foreground">Crypto payment</p><p className="mt-1 text-base font-bold text-primary">Minimum crypto deposit: $50.00</p></div><ShieldCheck className="text-primary" aria-hidden="true" /></div>

        <section aria-labelledby="phantom-guide-title" className="flex flex-col gap-4">
          <div>
            <h3 id="phantom-guide-title" className="text-lg font-semibold text-foreground">New to Phantom? Follow this visual guide.</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">These screenshots show exactly where to tap. Tap any image to zoom in. You can pause at any step and come back when your wallet is ready.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {phantomGuide.map((item) => (
              <article key={item.step} className="overflow-hidden rounded-2xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setZoomedImage({ src: item.image, alt: item.alt })}
                  className="group relative flex w-full min-h-52 items-center justify-center overflow-hidden bg-muted p-2 sm:min-h-64"
                  aria-label={`Enlarge screenshot for ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="block h-auto max-h-[32rem] w-full object-contain"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm ring-1 ring-border transition group-hover:bg-background group-active:scale-95">
                    <ZoomIn className="size-3.5" aria-hidden="true" />
                    Tap to enlarge
                  </span>
                </button>
                <div className="flex flex-col gap-2 p-4">
                  <div className="flex items-center gap-2">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {item.stepNumber}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{item.step} of {phantomGuide.length}</p>
                  </div>
                  <h4 className="font-semibold text-card-foreground">{item.title}</h4>
                  <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="deposit-address-title" className="rounded-2xl border border-border bg-muted/40 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 id="deposit-address-title" className="font-semibold text-card-foreground">Deposit address</h3><p className="mt-1 text-sm text-muted-foreground">Send only supported Solana assets to this address.</p></div><div className="rounded-xl bg-background p-2"><img src="/donation-qr.svg" alt="QR code for the donation deposit address" width="112" height="112" /></div></div>
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-background p-3"><code className="min-w-0 flex-1 break-all text-xs leading-5 text-muted-foreground">{DONATION_DEPOSIT_ADDRESS}</code><button type="button" onClick={copyAddress} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs font-semibold text-secondary-foreground transition hover:bg-secondary/80">{copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{copied ? 'Copied' : 'Copy address'}</button></div>
        </section>

        {message && <p role="status" className="rounded-xl border border-border bg-muted/50 p-3 text-sm leading-6 text-muted-foreground">{message}</p>}
        {walletAddress && <p className="break-all text-xs text-muted-foreground">Connected wallet: {walletAddress}</p>}
        <div className="flex flex-col gap-3 sm:flex-row"><button type="button" onClick={onBack} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted"><ArrowLeft aria-hidden="true" /> Back</button><button type="button" onClick={connectWallet} disabled={isConnecting} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60">{isConnecting ? <><Loader2 className="animate-spin" aria-hidden="true" /> Connecting...</> : <><Wallet aria-hidden="true" /> {walletAddress ? 'Reconnect Phantom' : 'Connect Phantom'}</>}</button></div>
      </div>

      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={zoomedImage.alt}
          onClick={() => setZoomedImage(null)}
        >
          <button
            type="button"
            onClick={() => setZoomedImage(null)}
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition hover:bg-background"
            aria-label="Close enlarged image"
          >
            <X aria-hidden="true" />
          </button>
          <img
            src={zoomedImage.src}
            alt={zoomedImage.alt}
            className="max-h-[90vh] max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}