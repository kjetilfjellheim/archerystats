package no.fd.archerystats.service;

import java.util.Date;
import java.util.List;
import no.fd.archerystats.dao.DiaryDao;
import no.fd.archerystats.service.pojo.Diary;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author kjetilf
 */
@Service
public class DiaryServiceImpl implements DiaryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(DiaryServiceImpl.class);
    
    @Autowired
    private DiaryDao diaryDao;    

    @Transactional
    public List<Diary> getDiary(String userId, Date fromDate, Date toDate, Integer spt, Integer maxentries) {
        List<Diary> diary = null;
        if (spt != null) {
            diary = diaryDao.findDiary(userId, fromDate, toDate, spt, maxentries);
        } else {
            diary = diaryDao.findDiary(userId, fromDate, toDate, maxentries);
        }     
        return diary;
    }

}
