package com.eurodyn.qlack.baseapplication.service;

import com.eurodyn.qlack.baseapplication.dto.ExtraInfoDTO;
import com.eurodyn.qlack.baseapplication.mapper.ExtraInfoMapper;
import com.eurodyn.qlack.baseapplication.model.ExtraInfo;
import com.eurodyn.qlack.baseapplication.repository.ExtraInfoRepository;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class ExtraInfoService extends BaseService<ExtraInfoDTO, ExtraInfo> {

  @Autowired
  private final ExtraInfoRepository repository;

  @Autowired
  private final ExtraInfoMapper mapper;

}