package no.fd.archerystats.service;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
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
public class StatisticsServiceImpl implements StatisticsService {

    private static final Logger LOGGER = LoggerFactory.getLogger(StatisticsServiceImpl.class);

    private static final String VERTICAL_LOW = "verticalLow";

    private static final String VERTICAL_CENTER = "verticalCenter";

    private static final String VERTICAL_HIGH = "verticalHigh";

    private static final String HORIZONTAL_LEFT = "horizontalLeft";

    private static final String HORIZONTAL_CENTER = "horizontalCenter";

    private static final String HORIZONTAL_RIGHT = "horizontalRight";

    private static final String PERFECT = "perfect";

    private static final String MISSED = "miss";

    @Autowired
    private RoundDao roundDao;

    @Autowired
    private DiaryDao diaryDao;

    @Transactional
    public Map<Date, Map<String, Integer>> getByDate(String userId, Date fromDate, Date toDate, Integer mindistance, Integer maxdistance) {
        LOGGER.info("Getting totals by date");
        Map<Date, Map<String, Integer>> result = new TreeMap<Date, Map<String, Integer>>();
        List<Round> rounds = roundDao.findRounds(userId, fromDate, toDate, mindistance, maxdistance);
        LOGGER.info("Got rounds from db: Number of rows {}", rounds.size());
        for (Round round : rounds) {
            if (!result.containsKey(round.getShootDate())) {
                Map<String, Integer> map = new HashMap<String, Integer>();
                map.put(VERTICAL_LOW, 0);
                map.put(VERTICAL_CENTER, 0);
                map.put(VERTICAL_HIGH, 0);
                map.put(HORIZONTAL_LEFT, 0);
                map.put(HORIZONTAL_CENTER, 0);
                map.put(HORIZONTAL_RIGHT, 0);
                if (round.getPerfectScored()) {
                    map.put(PERFECT, 0);
                }
                if (round.getMissScored()) {
                    map.put(MISSED, 0);
                }
                result.put(round.getShootDate(), map);
            }
            Map<String, Integer> dateResult = result.get(round.getShootDate());
            if (round.getVerticalLow() != null && round.getVerticalCenter() != null && round.getVerticalHigh() != null) {
                dateResult.put(VERTICAL_LOW, dateResult.get(VERTICAL_LOW) + round.getVerticalLow());
                dateResult.put(VERTICAL_CENTER, dateResult.get(VERTICAL_CENTER) + round.getVerticalCenter());
                dateResult.put(VERTICAL_HIGH, dateResult.get(VERTICAL_HIGH) + round.getVerticalHigh());
            }
            if (round.getHorizontalLeft() != null && round.getHorizontalCenter() != null && round.getHorizontalRight() != null) {
                dateResult.put(HORIZONTAL_LEFT, dateResult.get(HORIZONTAL_LEFT) + round.getHorizontalLeft());
                dateResult.put(HORIZONTAL_CENTER, dateResult.get(HORIZONTAL_CENTER) + round.getHorizontalCenter());
                dateResult.put(HORIZONTAL_RIGHT, dateResult.get(HORIZONTAL_RIGHT) + round.getHorizontalRight());
            }
            if (round.getPerfectScored() && dateResult.containsKey(PERFECT)) {
                dateResult.put(PERFECT, dateResult.get(PERFECT) + round.getPerfect());
            }
            if (round.getMissScored() && dateResult.containsKey(MISSED)) {
                dateResult.put(MISSED, dateResult.get(MISSED) + round.getMiss());
            }
        }
        LOGGER.info("Finished getting totals by date");
        return result;
    }

    @Transactional
    public Map<Date, Integer> getTrainingMinutes(String userId, Date fromDate, Date toDate, Integer spt) {
        LOGGER.info("Get training minutes {} {} {} {}", userId, fromDate, toDate, spt);
        Map<Date, Integer> result = new TreeMap();
        List<Diary> diaries = null;
        if (spt != null) {
            diaries = diaryDao.findDiary(userId, fromDate, toDate, spt, null);
        } else {
            diaries = diaryDao.findDiary(userId, fromDate, toDate, null);
        }
        for (Diary diary : diaries) {
            Date date = getWeekStart(diary.getDate().getTime());
            if (result.containsKey(date)) {
                result.put(date, result.get(date) + diary.getMinutes());
            } else {
                result.put(date, diary.getMinutes());
            }
        }
        if (!diaries.isEmpty()) {
            Date currentDate = getWeekStart(diaries.get(0).getDate().getTime());
            Date lastDate = getWeekStart(diaries.get(diaries.size() - 1).getDate().getTime());
            while (currentDate.before(lastDate)) {
                if (!result.containsKey(currentDate)) {
                    result.put(currentDate, 0);
                }
                Calendar cal = GregorianCalendar.getInstance();
                cal.setTime(currentDate);
                cal.add(Calendar.DATE, 7);
                currentDate = cal.getTime();
            }
        }
        return result;
    }

    private Date getWeekStart(long time) {
        Calendar cal = GregorianCalendar.getInstance(TimeZone.getTimeZone("UTC"));
        cal.setTimeInMillis(time);
        cal.setFirstDayOfWeek(Calendar.MONDAY);
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        cal.set(Calendar.HOUR, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return cal.getTime();
    }

    @Transactional
    public Map<String, Integer> getVerticalTotals(String userid, Date fromDate, Date toDate, Integer mindistance, Integer maxdistance) {
        LOGGER.info("Getting totals");
        Map<String, Integer> map = new HashMap<String, Integer>();
        List<Round> rounds = roundDao.findRounds(userid, fromDate, toDate, mindistance, maxdistance);
        LOGGER.info("Got rounds from db: Number of rows {}", rounds.size());
        int verticalLow = 0;
        int verticalCenter = 0;
        int verticalHigh = 0;
        for (Round round : rounds) {
            if (round.getVerticalLow() != null && round.getVerticalCenter() != null && round.getVerticalHigh() != null) {
                verticalLow += round.getVerticalLow();
                verticalCenter += round.getVerticalCenter();
                verticalHigh += round.getVerticalHigh();
            }
        }
        map.put(VERTICAL_LOW, verticalLow);
        map.put(VERTICAL_CENTER, verticalCenter);
        map.put(VERTICAL_HIGH, verticalHigh);
        LOGGER.info("Finished getting totals");
        return map;
    }

    @Transactional
    public Map<String, Integer> getHorizontalTotals(String userid, Date fromDate, Date toDate, Integer mindistance, Integer maxdistance) {
        LOGGER.info("Getting totals");
        Map<String, Integer> map = new HashMap<String, Integer>();
        List<Round> rounds = roundDao.findRounds(userid, fromDate, toDate, mindistance, maxdistance);
        LOGGER.info("Got rounds from db: Number of rows {}", rounds.size());
        int horizontalLeft = 0;
        int horizontalCenter = 0;
        int horizontalRight = 0;
        for (Round round : rounds) {
            if (round.getHorizontalLeft() != null && round.getHorizontalCenter() != null && round.getHorizontalRight() != null) {
                horizontalLeft += round.getHorizontalLeft();
                horizontalCenter += round.getHorizontalCenter();
                horizontalRight += round.getHorizontalRight();
            }
        }
        map.put(HORIZONTAL_LEFT, horizontalLeft);
        map.put(HORIZONTAL_CENTER, horizontalCenter);
        map.put(HORIZONTAL_RIGHT, horizontalRight);
        LOGGER.info("Finished getting totals");
        return map;
    }

    public Map<String, Integer> getVerticalLastTrainingTotals(String userid, Integer mindistance, Integer maxdistance) {
        LOGGER.info("Getting totals");
        Map<String, Integer> map = new HashMap<String, Integer>();
        List<Round> rounds = roundDao.findRoundsLastTraining(userid, mindistance, maxdistance);
        LOGGER.info("Got rounds from db: Number of rows {}", rounds.size());
        int verticalLow = 0;
        int verticalCenter = 0;
        int verticalHigh = 0;
        for (Round round : rounds) {
            if (round.getVerticalLow() != null && round.getVerticalCenter() != null && round.getVerticalHigh() != null) {
                verticalLow += round.getVerticalLow();
                verticalCenter += round.getVerticalCenter();
                verticalHigh += round.getVerticalHigh();
            }
        }
        map.put(VERTICAL_LOW, verticalLow);
        map.put(VERTICAL_CENTER, verticalCenter);
        map.put(VERTICAL_HIGH, verticalHigh);
        LOGGER.info("Finished getting totals");
        return map;        
    }

    public Map<String, Integer> getHorizontalLastTrainingTotals(String userid, Integer mindistance, Integer maxdistance) {
        LOGGER.info("Getting totals");
        Map<String, Integer> map = new HashMap<String, Integer>();
        List<Round> rounds = roundDao.findRoundsLastTraining(userid, mindistance, maxdistance);
        LOGGER.info("Got rounds from db: Number of rows {}", rounds.size());
        int horizontalLeft = 0;
        int horizontalCenter = 0;
        int horizontalRight = 0;
        for (Round round : rounds) {
            if (round.getHorizontalLeft() != null && round.getHorizontalCenter() != null && round.getHorizontalRight() != null) {
                horizontalLeft += round.getHorizontalLeft();
                horizontalCenter += round.getHorizontalCenter();
                horizontalRight += round.getHorizontalRight();
            }
        }
        map.put(HORIZONTAL_LEFT, horizontalLeft);
        map.put(HORIZONTAL_CENTER, horizontalCenter);
        map.put(HORIZONTAL_RIGHT, horizontalRight);
        LOGGER.info("Finished getting totals");
        return map;        
    }

}
