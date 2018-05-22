export class TransactionItem {
    constructor(
        public id:number,
        public transactionDate:Date,
        public requestor:string,
        public location:string,
        public status:string
    ){}    
}

export class TransactionDetail{
    constructor(
        public id:number,
        public transactionDate:Date,
        public requestor:string,
        public location:string,
        public status:string,
        public transactionCode:string,
        public description:string
    ){}
}