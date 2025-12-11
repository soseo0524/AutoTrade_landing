package com.autotrade.entity.partner;

import com.autotrade.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "individual", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Individual extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "individual_id")
    private Long individualId;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;
}
