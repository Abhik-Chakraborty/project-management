package com.pm.Project_Management_Server.repository;

import com.pm.Project_Management_Server.entity.GlobalRateCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GlobalRateCardRepository extends JpaRepository<GlobalRateCard, Long> {
    GlobalRateCard findByLevel(GlobalRateCard.Level level);
} 