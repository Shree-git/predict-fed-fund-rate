from timeit import default_timer as timer
from flask import Flask, jsonify, request
from flask_cors import CORS

from textblob import TextBlob

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["POST"])
def get_fed_fund_rate():
    txt = request.get_json()

    fedFund = sentiment_analysis(txt["beigeText"], txt["speechText"])
    return jsonify(fedFund), 201


def sentiment_analysis(beigeText, speechText):
    BeigeBook = TextBlob(beigeText)

    print(BeigeBook.sentiment.polarity)

    print(BeigeBook.sentiment.subjectivity)

    GovernorsSpeeches = TextBlob(speechText)

    print(GovernorsSpeeches.sentiment.polarity)

    print(GovernorsSpeeches.sentiment.subjectivity)

    FedFundPredicted = (
        -0.0305
        + 0.7250 * BeigeBook.sentiment.polarity
        - 0.3938 * BeigeBook.sentiment.subjectivity
        + 0.2882 * GovernorsSpeeches.sentiment.polarity
        + 0.2772 * GovernorsSpeeches.sentiment.subjectivity
    )

    return FedFundPredicted
