package no.fd.archerystats.service;

import java.util.Date;
import java.util.Map;

/**
 *
 * @author kjetilf
 */
public interface StatisticsService {

    Map<Date, Map<String, Integer>> getByDate(String userId, String bowId, Date fromDate, Date toDate, Integer distance);
        
    Map<Date, Integer> getTrainingMinutes(String userId, Date fromDate, Date toDate, Integer spt);
    
    Map<String, Integer> getVerticalTotals(String userid, Date fromDate, Date toDate, Integer mindistance, Integer maxdistance);

    Map<String, Integer> getHorizontalTotals(String userid, Date fromDate, Date toDate, Integer mindistance, Integer maxdistance);

}
