package no.fd.archerystats.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import no.fd.archerystats.service.pojo.Diary;

/**
 *
 * @author kjetilf
 */
public interface StatisticsService {

    Map<String, Integer> getTotals(String userId, String bowId, Date fromDate, Date toDate, Integer distance);

    Map<Date, Map<String, Integer>> getByDate(String userId, String bowId, Date fromDate, Date toDate, Integer distance);
        
    Map<Date, Integer> getTrainingMinutes(String userId, Date fromDate, Date toDate, Integer spt);

}
