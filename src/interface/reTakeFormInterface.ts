export interface RetakeFormInterface {
  validatorAddress: string,
  amount: number;
  reward: number;
  restakeValidation?: any;
}

export interface CommissionRateInterface{
  validatorAddress:string,
  newCommission:number|string,
}

export interface WithdrawInterface{
  validatorAddress:string,
}