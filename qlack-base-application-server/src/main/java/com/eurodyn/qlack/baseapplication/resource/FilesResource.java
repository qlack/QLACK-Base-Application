package com.eurodyn.qlack.baseapplication.resource;

import com.eurodyn.qlack.baseapplication.dto.FileDTO;
import com.eurodyn.qlack.baseapplication.model.File;
import com.eurodyn.qlack.baseapplication.service.FilesService;
import com.eurodyn.qlack.common.exception.QExceptionWrapper;
import com.eurodyn.qlack.util.data.exceptions.ExceptionWrapper;
import com.eurodyn.qlack.util.querydsl.EmptyPredicateCheck;
import com.querydsl.core.types.Predicate;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("files")
public class FilesResource {

  private final FilesService filesService;

  @PostMapping
  @ExceptionWrapper(wrapper = QExceptionWrapper.class, logMessage = "Could not save file.")
  public Response save(@RequestParam("file") MultipartFile file, @ModelAttribute FileDTO fileDTO) throws IOException {
    filesService.save(fileDTO, file);

    return Response.ok().build();
  }

  @GetMapping
  @EmptyPredicateCheck
  public Page<FileDTO> findAll(
      @QuerydslPredicate(root = File.class) Predicate predicate, Pageable pageable) {
    return filesService.findAll(predicate, pageable);
  }

  @GetMapping(value = "{id}")
  public FileDTO get(@PathVariable String id) {
    return filesService.findById(id);
  }

  @DeleteMapping(path = "{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  @ExceptionWrapper(wrapper = QExceptionWrapper.class, logMessage = "Could not delete file provisioning package.")
  public void delete(@PathVariable String id) {
    filesService.deleteById(id);
  }

  @GetMapping(value = "{id}/download")
  @ExceptionWrapper(wrapper = QExceptionWrapper.class, logMessage = "Could not download file.")
  public ResponseEntity<InputStreamResource> download(@PathVariable String id) {
    final FileDTO provisioningDTO = filesService.findById(id);

    return ResponseEntity
        .ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + provisioningDTO.getFileName())
        .contentLength(provisioningDTO.getFileSize())
        .contentType(MediaType.APPLICATION_OCTET_STREAM)
        .body(new InputStreamResource(filesService.download(id)));
  }
}
