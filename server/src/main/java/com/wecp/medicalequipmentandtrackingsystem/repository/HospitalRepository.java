package com.wecp.medicalequipmentandtrackingsystem.repository;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;



public interface HospitalRepository extends JpaRepository<Hospital,Long> {

}