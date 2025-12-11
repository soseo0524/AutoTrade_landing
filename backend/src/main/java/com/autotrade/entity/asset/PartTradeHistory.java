package com.autotrade.entity.asset;

import com.autotrade.entity.enums.ActorType;
import com.autotrade.entity.enums.EventType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "part_trade_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PartTradeHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long historyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "part_id", nullable = false)
    private Part part;

    @Enumerated(EnumType.STRING)
    @Column(name = "event_type", nullable = false)
    private EventType eventType;

    @Enumerated(EnumType.STRING)
    @Column(name = "actor_type", nullable = false)
    private ActorType actorType;

    @Column(name = "actor_id")
    private Long actorId;

    @Column(name = "price_cents")
    private Integer priceCents;

    @Column(name = "notes", length = 500)
    private String notes;

    @Column(name = "occurred_at", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime occurredAt = LocalDateTime.now();
}

