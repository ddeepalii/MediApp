package com.wecp.medicalequipmentandtrackingsystem.service;
 
 
import java.sql.SQLException;
import java.util.List;
 
import com.wecp.medicalequipmentandtrackingsystem.entitiy.Hospital;
import com.wecp.medicalequipmentandtrackingsystem.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
@Service
public class HospitalService {
   
    @Autowired
    private HospitalRepository hospitalRepository;
    public Hospital createHospital(Hospital hospital) {
        // create hospital
        return hospitalRepository.save(hospital);
    }
 
    public List<Hospital> getAllHospitals() throws SQLException{
        // return list of hospitals
        return hospitalRepository.findAll();
    }
 
 
   
}
 