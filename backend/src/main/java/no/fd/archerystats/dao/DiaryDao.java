
package no.fd.archerystats.dao;

import java.util.Date;
import java.util.List;
import no.fd.archerystats.service.pojo.Diary;

/**
 *
 * @author Kjetil
 */
public interface DiaryDao {
    
    List<Diary> findDiary(String userId, Date fromDate, Date toDate);

    List<Diary> findDiary(String userId, Date fromDate, Date toDate, Integer spt);
    
}
