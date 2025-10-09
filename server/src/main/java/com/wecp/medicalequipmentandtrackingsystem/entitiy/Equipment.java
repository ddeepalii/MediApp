// package com.wecp.medicalequipmentandtrackingsystem.entitiy;


// import javax.persistence.*;
// @Entity
// @Table(name = "equipments") // do not change table name
// public class Equipment {

//     @Id
//     @GeneratedValue(strategy=GenerationType.IDENTITY)
//     private Long id;
 
//     private String name;
//     private String description;
 
//     @ManyToOne 
//     @JoinColumn(name="hospital_id") 
//     private Hospital hospital;
//     public Equipment() {
//     }

    
 
//     public Equipment(Long id, String name, String description, Hospital hospital) {
//         this.id = id;
//         this.name = name;
//         this.description = description;
//         this.hospital = hospital;
//     }



//     public Long getId() {
//         return id;
//     }
 
   
//     public void setId(Long id) {
//         this.id = id;
//     }
 
//     public String getName() {
//         return name;
//     }
 
//     public void setName(String name) {
//         this.name = name;
//     }
 
//     public String getDescription() {
//         return description;
//     }
 
//     public void setDescription(String description) {
//         this.description = description;
//     }
 
//     public Hospital getHospital() {
//         return hospital;
//     }
 
//     public void setHospital(Hospital hospital) {
//         this.hospital = hospital;
//     }

// }

// package com.wecp.medicalequipmentandtrackingsystem.entitiy;


// import com.fasterxml.jackson.annotation.JsonIgnore;
// import javax.persistence.*;
// import java.util.List;

// @Entity
// @Table(name = "equipments") // do not change table name
// public class Equipment {

//     @Id
//     @GeneratedValue(strategy=GenerationType.IDENTITY)
//     private Long id;
 
//     private String name;
//     private String description;
 
//     @ManyToOne 
//     @JoinColumn(name="hospital_id") 
//     private Hospital hospital;

//     // When an Equipment is deleted (e.g., via Hospital cascade), also delete its Orders
//     @OneToMany(mappedBy = "equipment", cascade = CascadeType.ALL, orphanRemoval = true)
//     @JsonIgnore
//     private List<Order> orders;

//     public Equipment() {
//     }

//     public Equipment(Long id, String name, String description, Hospital hospital) {
//         this.id = id;
//         this.name = name;
//         this.description = description;
//         this.hospital = hospital;
//     }

//     public Long getId() {
//         return id;
//     }
 
//     public void setId(Long id) {
//         this.id = id;
//     }
 
//     public String getName() {
//         return name;
//     }
 
//     public void setName(String name) {
//         this.name = name;
//     }
 
//     public String getDescription() {
//         return description;
//     }
 
//     public void setDescription(String description) {
//         this.description = description;
//     }
 
//     public Hospital getHospital() {
//         return hospital;
//     }
 
//     public void setHospital(Hospital hospital) {
//         this.hospital = hospital;
//     }

//     public List<Order> getOrders() {
//         return orders;
//     }

//     public void setOrders(List<Order> orders) {
//         this.orders = orders;
//     }
 
// }
 


package com.wecp.medicalequipmentandtrackingsystem.entitiy;


import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "equipments") // do not change table name
public class Equipment {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
 
    private String name;
    private String description;
 
    @ManyToOne 
    @JoinColumn(name="hospital_id") 
    private Hospital hospital;

    // When an Equipment is deleted (e.g., via Hospital cascade), also delete its Orders and Maintenance records
    @OneToMany(mappedBy = "equipment", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Order> orders;

    @OneToMany(mappedBy = "equipment", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Maintenance> maintenanceRecords;

    public Equipment() {
    }

    public Equipment(Long id, String name, String description, Hospital hospital) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.hospital = hospital;
    }

    public Long getId() {
        return id;
    }
 
    public void setId(Long id) {
        this.id = id;
    }
 
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }
 
    public String getDescription() {
        return description;
    }
 
    public void setDescription(String description) {
        this.description = description;
    }
 
    public Hospital getHospital() {
        return hospital;
    }
 
    public void setHospital(Hospital hospital) {
        this.hospital = hospital;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public List<Maintenance> getMaintenanceRecords() {
        return maintenanceRecords;
    }

    public void setMaintenanceRecords(List<Maintenance> maintenanceRecords) {
        this.maintenanceRecords = maintenanceRecords;
    }
 
}
