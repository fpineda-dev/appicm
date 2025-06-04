import { Entries } from "../models/entries.js"
/**
 * 
 * @param {like<Entries>} LocalEntrie
 * @return {Entrie}
 */

export const entrieMapperToModel = ( localEntrie ) => {

    const {
        name, 
        service, 
        dayly_offering, 
        mission_offering, 
        special_offering,          
        total_tithes, 
        total, 
        id_department,
        created_on
    } = localEntrie;

    return new Entries({
        name, 
        service, 
        dayly_offering, 
        mission_offering, 
        special_offering,          
        total_tithes, 
        total, 
        id_department,
        created_on
    });
}