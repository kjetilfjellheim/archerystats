
package no.fd.archerystats.service;

import java.util.Date;
import java.util.Map;

/**
 *
 * @author kjetilf
 */
public interface StatisticsService {

    Map<String, Integer> getTotals(String userId, String bowId, Date fromDate, Date toDate, Integer distance);

   Map<Date, Map<String, Integer>> getByDate(String userId, String bowId, Integer distance);
       
}
