package com.eurodyn.qlack.baseapplication.repository;

import com.eurodyn.qlack.baseapplication.model.File;
import org.springframework.content.commons.repository.ContentStore;
import org.springframework.stereotype.Component;

@Component
public interface FileContentStore extends ContentStore<File, String> {

}
