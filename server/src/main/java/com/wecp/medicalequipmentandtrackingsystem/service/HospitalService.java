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

    public List<Hospital> getAllHospitals() throws SQLException {
        // return list of hospitals
        return hospitalRepository.findAll();
    }

    public Hospital updateHospital(Long id, Hospital hospitalDetails) {
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hospital not found with id " + id));

        hospital.setName(hospitalDetails.getName());
        hospital.setLocation(hospitalDetails.getLocation());
        // update other fields as needed

        return hospitalRepository.save(hospital);
    }

    public void deleteHospital(Long id) {
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hospital not found with id " + id));
        hospitalRepository.delete(hospital);
    }

}
