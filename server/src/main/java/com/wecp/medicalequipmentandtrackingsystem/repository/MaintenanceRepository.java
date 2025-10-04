package com.wecp.medicalequipmentandtrackingsystem.repository;


import com.wecp.medicalequipmentandtrackingsystem.entitiy.Maintenance;

import org.jboss.jandex.Main;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface MaintenanceRepository extends JpaRepository<Maintenance,Long> {

}