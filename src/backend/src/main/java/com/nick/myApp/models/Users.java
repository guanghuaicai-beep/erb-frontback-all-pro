package com.nick.myApp.models;


import org.hibernate.validator.constraints.Length;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "users" , uniqueConstraints = {@UniqueConstraint(columnNames = "email"),@UniqueConstraint(columnNames = "mobile")})
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"password"})


public class Users {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private int id;

   @Length(min = 3 , max = 100 , message = "Firstname must be between 3 and 100 characters")
   @NotBlank(message = "Firstname cannot be empty")
   @Pattern(regexp = "^[A-Z][a-zA-Z]*$", message = "Firstname must start with an uppercase English letter")
   @Column(nullable = false , length = 100)
   private String firstname;
   
   @Length(min = 3 , max = 100 , message = "Lastname must be between 3 and 100 characters")
   @NotBlank(message = "Last name cannot be empty")
   @Pattern(regexp = "^[A-Z][a-zA-Z]*$", message = "Lastname must start with an uppercase English letter")
   @Column(nullable = false , length = 100)
   private String lastname;

   @Length(min = 3 , max = 100 , message = "Username must be between 3 and 100 characters")
   @NotBlank(message = "Username cannot be empty")
   @Pattern(regexp = "/^[a-zA-Z0-9_]{3,20}$/")
   @Column(unique = false , nullable = false , length = 100)
   private String username;

   @Email(message = "Please enter a valid email address")
   @NotBlank(message = "Email cannot be empty")
   @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$")
   @Column(nullable = false , length = 255)
   private String email;

   @Length(min = 8 , max = 255 , message = "Password must be between 8 and 255 characters")
    @NotBlank(message = "Password cannot be empty")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$")
    @Column(nullable = false , length = 255)
   private String password;

    @Length(min = 8 , max = 20 , message = "Mobile must be between 8 and 20 characters")
    @NotBlank(message = "Mobile cannot be empty")
    @Pattern(regexp = "/^\\d{8}$/" , message = "Only 8 digits are allowed")
    @Column(unique = true , nullable = false , length = 20)
   private String mobile;

   

   

}
