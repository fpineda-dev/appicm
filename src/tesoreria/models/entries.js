export class Entries {
    /**
     * 
     * @param {like<Entries> dataEntries}
     */

    constructor({ name, service, dayly_offering, mission_offering, special_offering, total_tithes, total, id_department, created_on}) {
        this.name = name,
        this.service = service,
        this.dayly_offering = dayly_offering,
        this.mission_offering = mission_offering,
        this.special_offering = special_offering,        
        this.total_tithes = total_tithes,
        this.total = total,
        this.id_department = id_department,
        this.created_on = created_on
    }
    
    
    
}