declare class Paystack {
  constructor(secretKey: string);
  transaction: {
    initialize: (options: { amount: number; email: string }) => Promise<any>;
  };
}

declare module "paystack" {
  export = Paystack;
}
