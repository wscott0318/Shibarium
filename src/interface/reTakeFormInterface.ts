export interface RetakeFormInterface {
  validatorAddress: string,
  amount: number | string;
  reward: number | string;
  restakeValidation?: any;
}

export interface CommissionRateInterface{
  validatorAddress:string,
  newCommission:number|string,
}

export interface WithdrawInterface{
  validatorAddress:string,
}