package com.eurodyn.qlack.baseapplication.mapper;

import com.eurodyn.qlack.baseapplication.dto.ExtraInfoDTO;
import com.eurodyn.qlack.baseapplication.model.ExtraInfo;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public abstract class ExtraInfoMapper extends BaseMapper<ExtraInfoDTO, ExtraInfo> {

}
