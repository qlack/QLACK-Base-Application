package com.eurodyn.qlack.baseapplication.service;

import com.eurodyn.qlack.baseapplication.dto.FileDTO;
import com.eurodyn.qlack.baseapplication.model.File;
import com.eurodyn.qlack.baseapplication.repository.FileContentStore;
import java.io.IOException;
import java.io.InputStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

@Log
@Service
@Validated
@Transactional
@RequiredArgsConstructor
public class FilesService extends BaseService<FileDTO, File> {

  private final FileContentStore fileContentStore;

  public InputStream download(String fileId) throws IOException {
    final File file = findEntityById(fileId);
    return fileContentStore.getContent(file);
  }

  public String save(FileDTO fileDTO, MultipartFile file) throws IOException {
    return super.save(fileDTO, file.getInputStream()).getId();
  }
}
