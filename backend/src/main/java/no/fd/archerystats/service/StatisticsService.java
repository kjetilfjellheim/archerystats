package no.fd.archerystats.service;

import java.util.Date;
import java.util.Map;

/**
 *
 * @author kjetilf
 */
public interface StatisticsService {

    Map<Date, Map<String, Integer>> getByDate(String userId, Date fromDate, Date toDate, Integer mindistance, Integer maxdistance);
        
    Map<Date, Integer> getTrainingMinutes(String userId, Date fromDate, Date toDate, Integer spt);
    
    Map<String, Integer> getVerticalTotals(String userid, Date fromDate, Date toDate, Integer mindistance, Integer maxdistance);

    Map<String, Integer> getHorizontalTotals(String userid, Date fromDate, Date toDate, Integer mindistance, Integer maxdistance);

    Map<String, Integer> getVerticalLastTrainingTotals(String userid, Integer mindistance, Integer maxdistance);

    Map<String, Integer> getHorizontalLastTrainingTotals(String userid, Integer mindistance, Integer maxdistance);    
    
}
