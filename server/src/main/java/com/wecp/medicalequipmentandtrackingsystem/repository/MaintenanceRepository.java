package com.wecp.medicalequipmentandtrackingsystem.repository;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.Maintenance;


import org.springframework.data.jpa.repository.JpaRepository;



public interface MaintenanceRepository extends JpaRepository<Maintenance,Long> {

}