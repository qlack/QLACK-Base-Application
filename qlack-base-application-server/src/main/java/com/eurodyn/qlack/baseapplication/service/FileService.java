package com.eurodyn.qlack.baseapplication.service;

import com.eurodyn.qlack.baseapplication.config.AppProperties;
import com.eurodyn.qlack.baseapplication.dto.FileDTO;
import com.eurodyn.qlack.baseapplication.mapper.FileMapper;
import com.eurodyn.qlack.baseapplication.model.File;
import com.eurodyn.qlack.baseapplication.repository.FileRepository;
import com.eurodyn.qlack.common.exception.QCouldNotSaveException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
@RequiredArgsConstructor
public class FileService extends BaseService<FileDTO, File> {

  private final FileRepository repository;
  private final FileMapper fileMapper;
  private final AppProperties appProperties;

  public FileDTO saveFile(MultipartFile file) {
    Path path =
        Paths.get(appProperties.getFsRoot())
            .resolve(Objects.requireNonNull(file.getOriginalFilename()));

    try {
      byte[] bytes = file.getBytes();
      Files.write(path, bytes);
    } catch (IOException e) {
      throw new QCouldNotSaveException("Could not save file");
    }

    File savedFile = new File();
    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
    savedFile.setName(fileName);
    repository.save(savedFile);

    return fileMapper.map(savedFile);
  }

  public byte[] findFileById(String id) throws IOException {
    FileDTO fileDTO = super.findById(id);
    Path path = Paths.get(appProperties.getFsRoot()).toAbsolutePath().resolve(fileDTO.getName());
    return Files.readAllBytes(path);
  }
}
