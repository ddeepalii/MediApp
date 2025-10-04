package com.wecp.medicalequipmentandtrackingsystem.repository;
 
 
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import java.util.List;
 
@Repository
public interface EquipmentRepository extends JpaRepository<Equipment,Long>{
    // gets all equipments of particular hospital
     List<Equipment> findByHospitalId(Long HospitalId);
 
}