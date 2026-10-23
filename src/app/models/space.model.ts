import { cancellationpolicies } from "./cancellationpolicies.model"
import { location } from "./location.model"
import { service } from "./service.model"
import { consumerOwner } from "./user.model"

export interface space{
    idSpace: number,
    consumerOwner: consumerOwner,
    location: location,
    cancellationPolicies: cancellationpolicies,
    nameSpace: string,
    description: string,
    basePrice: number,
    publicationDate: Date,
    bufferTime: number,
    isActive: boolean,
    services: service[]
}