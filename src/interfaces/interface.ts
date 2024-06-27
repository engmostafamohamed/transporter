export interface MoverInterface{
    weightLimit:number,
    energyPower:number,
    status:string,
}
export interface ItemInterface{
    name:string
    weight:number,
}
export interface LoadInterface{
    mover_id:number,
    item_id:number,
}
export interface MissionInterface{
    mover_id:number,
}