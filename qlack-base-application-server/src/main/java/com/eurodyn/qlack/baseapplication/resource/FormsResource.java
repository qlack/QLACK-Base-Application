package com.eurodyn.qlack.baseapplication.resource;

import com.eurodyn.qlack.baseapplication.dto.FormDTO;
import com.eurodyn.qlack.common.exception.QExceptionWrapper;
import com.eurodyn.qlack.util.data.exceptions.ExceptionWrapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("forms")
@RequiredArgsConstructor
public class FormsResource {

  @ExceptionWrapper(wrapper = QExceptionWrapper.class, logMessage = "Could not save form.")
  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public FormDTO save(@Valid @RequestBody FormDTO formDTO) {
    return formDTO;
  }

}
