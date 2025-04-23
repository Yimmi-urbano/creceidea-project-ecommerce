export interface Payment {
  name?: string;
  nameId?: string;
  details?: Record<string, any>;
  credentials?: {
    publicKey?: string;
    privateKey?: string;
    clientId?: string;
    secretKey?: string;
    merchantId?: string;
  };
}
