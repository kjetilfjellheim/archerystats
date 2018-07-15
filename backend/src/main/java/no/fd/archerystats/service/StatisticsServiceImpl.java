package no.fd.archerystats.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import no.fd.archerystats.dao.RoundDao;
import no.fd.archerystats.service.pojo.Round;
import org.apache.commons.configuration.Configuration;
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
public class StatisticsServiceImpl extends AbstractService implements StatisticsService {

    private static final Logger LOGGER = LoggerFactory.getLogger(StatisticsServiceImpl.class);

    @Autowired
    private Configuration configuration;

    @Autowired
    private RoundDao roundDao;

    @Transactional
    public Map<String, Integer> getTotals(String userId, String bowId, Date fromDate, Date toDate, Integer distance) {
        Map<String, Integer> map = new HashMap<String, Integer>();
        List<Round> rounds = roundDao.findRounds(userId, bowId, fromDate, toDate, distance);
        int verticalLow = 0;
        int verticalCenter = 0;
        int verticalHigh = 0;
        int horizontalLeft = 0;
        int horizontalCenter = 0;
        int horizontalRight = 0;
        for (Round round : rounds) {
            verticalLow += round.getVerticalLow();
            verticalCenter += round.getVerticalCenter();
            verticalHigh += round.getVerticalHigh();
            horizontalLeft += round.getHorizontalLeft();
            horizontalCenter += round.getHorizontalCenter();
            horizontalRight += round.getHorizontalRight();
        }
        map.put("verticalLow", verticalLow);
        map.put("verticalCenter", verticalCenter);
        map.put("verticalHigh", verticalHigh);
        map.put("horizontalLeft", horizontalLeft);
        map.put("horizontalCenter", horizontalCenter);
        map.put("horizontalRight", horizontalRight);
        return map;
    }

    @Transactional
    public Map<Date, Map<String, Integer>> getByDate(String userId, String bowId, Integer distance) {
        Map<Date, Map<String, Integer>> result = new TreeMap<Date, Map<String, Integer>>();
        List<Round> rounds = roundDao.findRounds(userId, bowId, distance);
        for (Round round : rounds) {
            if (!result.containsKey(round.getShootDate())) {
                Map<String, Integer> map = new HashMap<String, Integer>();
                map.put("verticalLow", 0);
                map.put("verticalCenter", 0);
                map.put("verticalHigh", 0);
                map.put("horizontalLeft", 0);
                map.put("horizontalCenter", 0);
                map.put("horizontalRight", 0);
                if (round.getPerfectScored()) {
                    map.put("perfect", 0);
                }
                if (round.getMissScored()) {
                    map.put("miss", 0);
                }
                result.put(round.getShootDate(), map);
            }
            Map<String, Integer> dateResult = result.get(round.getShootDate());
            dateResult.put("verticalLow", dateResult.get("verticalLow") + round.getVerticalLow());
            dateResult.put("verticalCenter", dateResult.get("verticalCenter") + round.getVerticalCenter());
            dateResult.put("verticalHigh", dateResult.get("verticalHigh") + round.getVerticalHigh());
            dateResult.put("horizontalLeft", dateResult.get("horizontalLeft") + round.getHorizontalLeft());
            dateResult.put("horizontalCenter", dateResult.get("horizontalCenter") + round.getHorizontalCenter());
            dateResult.put("horizontalRight", dateResult.get("horizontalRight") + round.getHorizontalRight());
            if (round.getPerfectScored()) {
                dateResult.put("perfect", dateResult.get("perfect") + round.getPerfect());
            }
            if (round.getMissScored()) {
                dateResult.put("miss", dateResult.get("miss") + round.getMiss());
            }
        }
        return result;
    }

}
