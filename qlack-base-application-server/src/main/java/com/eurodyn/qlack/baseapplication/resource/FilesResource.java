package com.eurodyn.qlack.baseapplication.resource;

import com.eurodyn.qlack.baseapplication.dto.FileDTO;
import com.eurodyn.qlack.baseapplication.model.File;
import com.eurodyn.qlack.baseapplication.service.FilesService;
import com.eurodyn.qlack.common.exception.QExceptionWrapper;
import com.eurodyn.qlack.util.data.exceptions.ExceptionWrapper;
import com.eurodyn.qlack.util.querydsl.EmptyPredicateCheck;
import com.querydsl.core.types.Predicate;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("files")
public class FilesResource {

  private final FilesService filesService;

  @PostMapping
  @ExceptionWrapper(wrapper = QExceptionWrapper.class, logMessage = "Could not save file.")
  public ResponseEntity save(@RequestParam("file") MultipartFile file,
      @ModelAttribute FileDTO fileDTO) throws IOException {
    filesService.save(fileDTO, file);

    return ResponseEntity.ok().build();
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
  @ExceptionWrapper(wrapper = QExceptionWrapper.class, logMessage = "Could not delete file."
      + "provisioning package.")
  public void delete(@PathVariable String id) {
    filesService.deleteById(id);
  }

  @GetMapping(value = "{id}/download")
  @ExceptionWrapper(wrapper = QExceptionWrapper.class, logMessage = "Could not download file.")
  public ResponseEntity download(@PathVariable String id) throws IOException {
    final FileDTO provisioningDTO = filesService.findById(id);

    return ResponseEntity
        .ok()
        .header(HttpHeaders.CONTENT_DISPOSITION,
            "attachment; filename=" + provisioningDTO.getFileName())
        .contentLength(provisioningDTO.getFileSize())
        .contentType(MediaType.APPLICATION_OCTET_STREAM)
        .body(new InputStreamResource(filesService.download(id)));
  }
}
