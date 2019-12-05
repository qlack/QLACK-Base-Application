package com.eurodyn.qlack.baseapplication.web;

import com.eurodyn.qlack.baseapplication.dto.FileDTO;
import com.eurodyn.qlack.baseapplication.model.File;
import com.eurodyn.qlack.baseapplication.service.FileService;
import com.eurodyn.qlack.util.querydsl.EmptyPredicateCheck;
import com.querydsl.core.types.Predicate;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@Validated
@RestController
@Transactional
@RequestMapping("/api/secured/file")
@RequiredArgsConstructor
public class FileController {

  @Autowired
  private final FileService fileService;

  @PostMapping
  public void upload(@RequestParam("file") MultipartFile file) {
    fileService.saveFile(file);
  }

  @GetMapping("/sorted")
  @EmptyPredicateCheck
  public List<FileDTO> findAll(@QuerydslPredicate(root = File.class) Predicate predicate,
      Sort sort) {
    return fileService.findAll(predicate, sort);
  }

  @GetMapping(path = "{fileId}", produces = MediaType.IMAGE_JPEG_VALUE)
  public @ResponseBody
  byte[] getImageWithMediaType(@Valid @PathVariable String fileId) throws IOException {
    return fileService.findFileById(fileId);
  }

}
