package no.fd.archerystats.service;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import no.fd.archerystats.dao.DiaryDao;
import no.fd.archerystats.dao.RoundDao;
import no.fd.archerystats.service.pojo.Diary;
import no.fd.archerystats.service.pojo.Round;
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
public class DiaryServiceImpl extends AbstractService implements DiaryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(DiaryServiceImpl.class);
    
    @Autowired
    private DiaryDao diaryDao;    

    public List<Diary> getDiary(String userId, Date fromDate, Date toDate, Integer spt) {
        List<Diary> diary = null;
        if (spt != null) {
            diary = diaryDao.findDiary(userId, fromDate, toDate, spt);
        } else {
            diary = diaryDao.findDiary(userId, fromDate, toDate);
        }     
        return diary;
    }

}
