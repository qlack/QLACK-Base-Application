package com.eurodyn.qlack.baseapplication.resource;

import com.eurodyn.qlack.common.exception.QExceptionWrapper;
import com.eurodyn.qlack.util.data.exceptions.ExceptionWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("http")
public class HttpResource {

  @GetMapping
  @ExceptionWrapper(wrapper = QExceptionWrapper.class, logMessage = "Could not process.")
  public ResponseEntity<Boolean> process() throws InterruptedException {
    Thread.sleep(5000);

    return ResponseEntity.ok(true);
  }
}
