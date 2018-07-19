package no.fd.archerystats.service;

import java.util.Date;
import java.util.List;
import no.fd.archerystats.service.pojo.Diary;

/**
 *
 * @author kjetilf
 */
public interface DiaryService {
    
    List<Diary> getDiary(String userId, Date fromDate, Date toDate, Integer spt);
    
}
