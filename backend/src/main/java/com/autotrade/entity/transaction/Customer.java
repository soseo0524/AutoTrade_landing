package com.autotrade.entity.transaction;

import com.autotrade.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "customer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "name", nullable = false, length = 120)
    private String name;

    @Column(name = "mail")
    private String mail;

    @Column(name = "phone", length = 40)
    private String phone;
}

