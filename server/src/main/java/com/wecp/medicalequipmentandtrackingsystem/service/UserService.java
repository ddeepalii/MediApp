package com.wecp.medicalequipmentandtrackingsystem.service;
 
import com.wecp.medicalequipmentandtrackingsystem.config.UserInfoUserDetails;
import com.wecp.medicalequipmentandtrackingsystem.entitiy.User;
import com.wecp.medicalequipmentandtrackingsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
 
 
@Service
public class UserService implements UserDetailsService {
 
    @Autowired
    private UserRepository userRepository;
 
    @Autowired
    private PasswordEncoder passwordEncoder;
 
    public User registerUser(User user) {
        if(getUserByUsername(user.getUsername()) == null){
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepository.save(user);
        }else{
            return null;
        }
       
    }
 
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
 
    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username + "is not found");
        }
        return new UserInfoUserDetails(user);
    }
}
 